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

const CategoriesContens = styled.div`
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

function AdminProductCategories() {
  const items = [...Array(4)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` }));
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addCategories } = useAdminProducts(workspaceId);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  console.log(addCategories);
  const [enabled, setEnabled] = useState(false);
  const onDragEnd = ({}: DropResult) => {};
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  const onClickHandler = () => {
    console.log(categoryInputRef.current?.value);
  };
  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer>
            <AppInputWithButton ref={categoryInputRef} onClickHandler={onClickHandler} />
          </CategoriesInputContainer>
          <CategoriesContentContainer>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(pro) => (
                          <CategoriesContens ref={pro.innerRef} {...pro.draggableProps} {...pro.dragHandleProps}>
                            {item.content}
                          </CategoriesContens>
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
