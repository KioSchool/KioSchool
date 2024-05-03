import AppContainer from '@components/common/container/AppContainer';
import NavBar from '@components/common/nav/NavBar';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import AppInputWithButton from '@components/common/input/AppInputWithButton';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import DragIconSvg from '@resources/svg/DragIconSvg';
import DeleteButtonGraySvg from '@resources/svg/DeleteButtonGraySvg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const CategoriesInputContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const CategoriesButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesItemContainer = styled.div`
  position: relative;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoriesContensContainer = styled.div`
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CategoriesName = styled.label`
  font-family: Poppins;
  font-size: 20px;
  width: 50%;
  padding-left: 20px;
`;

const DeleteIcon = styled(DeleteButtonGraySvg)`
  position: absolute;
  left: 13px;
`;

function AdminProductCategories() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addCategories, fetchCategories, reorderCategories } = useAdminProducts(workspaceId);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [rawCategories, setRawCategories] = useRecoilState(categoriesAtom);
  const [enabled, setEnabled] = useState(false);
  const categories = rawCategories.map((category) => ({
    ...category,
    id: String(category.id),
  }));

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    fetchCategories();
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const categoriesIdParsedNumber = categories.map((itm) => ({ ...itm, id: Number(itm.id) }));
    const changedCategories = reorder(categoriesIdParsedNumber, result.source.index, result.destination.index);
    const arr = changedCategories.map((itm) => itm.id);
    setRawCategories(changedCategories);
    reorderCategories(arr);
  };

  if (!enabled) {
    return null;
  }

  const addCategoryHandler = () => {
    const userInput = categoryInputRef.current?.value;

    if (userInput === '' || userInput === undefined) {
      alert('카테고리를 입력해주세요');
      return;
    }

    addCategories(userInput);
  };

  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer>
            <AppInputWithButton ref={categoryInputRef} onclick={addCategoryHandler} />
          </CategoriesInputContainer>
          <CategoriesContentContainer>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {categories.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(pro) => (
                          <CategoriesItemContainer ref={pro.innerRef} {...pro.draggableProps} {...pro.dragHandleProps}>
                            <DeleteIcon />
                            <CategoriesContensContainer>
                              <CategoriesName>{item.name}</CategoriesName>
                              <DragIconSvg style={{ paddingRight: '20px' }} />
                            </CategoriesContensContainer>
                          </CategoriesItemContainer>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CategoriesContentContainer>
          <CategoriesButtonContainer>
            <AppButton size={'medium'}>편집 완료</AppButton>
          </CategoriesButtonContainer>
        </Container>
      </AppContainer>
    </>
  );
}

export default AdminProductCategories;
