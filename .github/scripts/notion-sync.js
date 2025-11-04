// GitHub Action에서 'env:'로 전달해 준 변수들을 가져옵니다.
const { NOTION_API_KEY, NOTION_DATABASE_ID, TASK_ID_NUM, PR_URL, PR_ACTION, PR_IS_MERGED } = process.env;

// --- 노션 DB 속성 이름 (하드코딩) ---
const ID_PROPERTY_NAME = 'ID';
const STATUS_PROPERTY_NAME = '상태';
const STATUS_IN_PROGRESS = '진행 중';
const STATUS_DONE = '완료';
// ------------------------------------

// 메인 로직을 비동기 함수로 실행
async function main() {
  if (!TASK_ID_NUM) {
    console.log('Task ID number is not provided. Skipping.');
    return;
  }

  const { Client } = require('@notionhq/client');
  const notion = new Client({ auth: NOTION_API_KEY });

  const taskIdNum = parseInt(TASK_ID_NUM, 10);
  const taskIdString = `KIO-${taskIdNum}`;
  const isMerged = PR_IS_MERGED === 'true'; // 문자열 'true'를 boolean으로 변환

  let newStatus = null;
  let commentText = null;

  // 1. 이벤트에 따라 상태와 코멘트 결정
  if (PR_ACTION === 'opened') {
    newStatus = STATUS_IN_PROGRESS;
    commentText = `🚀 PR이 생성되었습니다: ${PR_URL}`;
  } else if (PR_ACTION === 'reopened') {
    newStatus = STATUS_IN_PROGRESS;
  } else if (PR_ACTION === 'closed' && isMerged) {
    newStatus = STATUS_DONE;
    commentText = '✅ PR이 머지되었습니다';
  } else {
    console.log(`Skipping: PR action '${PR_ACTION}', merged status '${isMerged}'.`);
    return;
  }

  // 2. KIO-ID (숫자)로 노션 페이지 검색
  let pageId = null;
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: ID_PROPERTY_NAME,
        unique_id: {
          equals: taskIdNum,
        },
      },
    });

    if (response.results.length === 0) {
      console.log(`[Error] No Notion page found with ID: ${taskIdString}`);
      return;
    }
    pageId = response.results[0].id;
    console.log(`Found Notion page: ${pageId}`);
  } catch (error) {
    console.error('Error finding Notion page:', error.body || error.message);
    return;
  }

  // 3. 노션 페이지 상태 업데이트 (Status 타입)
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        [STATUS_PROPERTY_NAME]: {
          status: {
            name: newStatus,
          },
        },
      },
    });
    console.log(`Updated status to '${newStatus}' for page ${pageId}`);
  } catch (error) {
    console.error('Error updating Notion page status:', error.body || error.message);
    // 상태 업데이트에 실패해도 코멘트는 시도
  }

  // 4. 노션 페이지에 코멘트 추가 (링크 포함)
  try {
    if (!commentText) {
      return;
    }

    await notion.comments.create({
      parent: { page_id: pageId },
      rich_text: [
        {
          text: {
            content: commentText,
            link: { url: PR_URL },
          },
        },
      ],
    });
    console.log(`Added comment to page ${pageId}`);
  } catch (error) {
    console.error('Error adding comment to Notion page:', error.body || error.message);
  }
}

// 스크립트 실행
main();
