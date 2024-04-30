import AppContainer from '@components/common/container/AppContainer';
import NavBar from '@components/common/nav/NavBar';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import AppInputWithButton from '@components/common/input/AppInputWithButton';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
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
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const CategoriesButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: skyBlue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesContens = styled.div`
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 12px;
  margin: 10px 0;
`;

function AdminProductCategories() {
  const items = [...Array(10)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` }));

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
  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer>
            <AppInputWithButton />
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
