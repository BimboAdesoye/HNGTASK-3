import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Images } from "../components/Images";
import { SpinnerCircular } from "spinners-react";

const Gallery = () => {
  const [images, setImages] = useState(Images);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  }

  useEffect(() => {
    setTimeout(() => {
      const importedData = Images;
      setImages(importedData);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="gallery container d-flex justify-content-center align-items-center">
      {loading ? (
        <SpinnerCircular size={130}/>
      ) : (
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
                          <button className="image-btn fw-bold">{tag}</button>
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
      )}
    </div>
  );
};

export default Gallery;
