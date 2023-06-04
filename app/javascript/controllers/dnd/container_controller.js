import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static outlets = ["dnd--item"]

  disableDrag(event) {
    event.preventDefault()
    this.element.classList.remove("dropzone")
  }
 
  move(event, droppedOn) {
    droppedOn.element.insertAdjacentElement(this.beforeOrAfter(event, droppedOn), 
                                            this.draggedItem(event).element)
    this.draggedItem(event).element.draggable = false
    this.reorder()
  }

  movingUp(event, over) {
    const dragged = this.draggedItem(event)
    return dragged.sortOrder() > over.sortOrder()
  }

  // private

  reorder(){
    this.dndItemOutlets.forEach((item, index) => {
      item.setSortOrder(index)
      item.element.classList.remove("drop-above", "drop-below")
    })
  }

  beforeOrAfter(event, droppedOn) {
    return this.movingUp(event, droppedOn) ? "beforebegin" : "afterend"
  }

  draggedItem(event) {
    const draggedId = event.dataTransfer.getData("text/plain")
    return this.dndItemOutlets.find(item => item.rowId() == draggedId)
  }
}