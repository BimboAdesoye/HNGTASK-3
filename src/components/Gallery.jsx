import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Images } from "../components/Images";

const Gallery = () => {
  const [images, setImages] = useState(Images);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  }

  return (
    <div className="gallery container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="image-gallery">
          {(provided) => (
            <div
              className="row image-gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((image, index) => {
                const { id, img, tag } = image;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="image col-lg-4 col-md-6"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={img}
                          alt="wildlife"
                          className="img-fluid image"
                        />
                        <button className="image-btn">{tag}</button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Gallery;
