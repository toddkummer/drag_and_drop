import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["id", "order", "handle", "description"]
  static outlets = ["dnd--container"]

  initialize() { this.debug = false }

  // events fired on element being dragged
  //
  //     -- DRAG --
  enableDrag(event) {
    event.stopPropagation()

    this.element.draggable = true
    this.dndContainerOutlet.element.classList.add("dropzone")
  }

  dragStart(event) {
    event.stopPropagation()

    if (this.element.draggable) {
      event.target.classList.add("dragged")
      event.dataTransfer.setData("text/plain", this.rowId())
      event.dataTransfer.effectAllowed = "move"
    }
  }

  dragEnd(event) {
    event.stopPropagation()
    this.log(event, "DRAG END")
    event.target.classList.remove("dragged")
  }

  //events fired on drop zone elements
  //
  //     -- DROP --
  addDropIndicator(event) {
    if (this.ignorableDropEvent(event)) {
      return
    }

    event.preventDefault()
    this.log(event, "ENTER")
    this.element.classList.add(this.borderDropClass(event))
  }

  // oddity of the API, this is how you say it's okay to drop on an element
  allowDrop(event) {
    if (this.ignorableDropEvent(event)) {
      return
    }

    event.preventDefault()
  }

  removeDropIndicator(event) {
    if (this.ignorableDropEvent(event)) {
      return
    }

    event.preventDefault()
    this.log(event, "LEAVE")
    this.element.classList.remove("drop-above", "drop-below")
  }

  log(event, type) {
    if (!this.debug) { return }

    console.log("[" + type +"] --> " + this.descriptionTarget.value 
      + " (" + event.target.tagName + ": " + event.target.classList + ")")
  }

  drop(event) {
    event.preventDefault()
    this.log(event, "DROP")
    this.dndContainerOutlet.move(event, this)
  }

  rowId() {
    return this.idTarget.id
  }

  sortOrder() {
    return this.orderTarget.value
  }

  setSortOrder(value) {
    this.orderTarget.value = value
  }

  // private

  ignorableDropEvent(event) {
    return this.dropEventFiringOnElementBeingDragged() || !this.dragInProgress()
  }

  dropEventFiringOnElementBeingDragged() {
    return this.element.draggable
  }

  dragInProgress() {
    return this.dndContainerOutlet.element.classList.contains("dropzone")
  }

  borderDropClass(event) {
    return this.dndContainerOutlet.movingUp(event, this) ? "drop-above" : "drop-below"
  }
}