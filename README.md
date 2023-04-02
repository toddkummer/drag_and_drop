# Drag and Drop

This provides an example of using [the HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to sort a list in a Rails application. The solution uses two [Stimulus](https://stimulus.hotwired.dev/) controllers to invoke the API and update the sort order.

## Usage

This solution is not packaged. Implementation requires the copy-and-paste skills of the developer.

The two controllers are in `app/javascript/controllers` and namespaced as `dnd`:
- [Container Controller](app/javascript/controllers/dnd/container_controller.js)
- [Item Controller](app/javascript/controllers/dnd/item_controller.js)

In this implementation, the two controllers are added to [the TODO List form view](app/views/todo_lists/_form.html.erb) and [the Task Fields partial](app/views/todo_lists/_task_fields.html.erb).

### Container Controller

The main container element specifies (1) the container controller, (2) the outlet for the item controller, and (3) the mouseup listener:

```html
  <div id="container"
    data-controller="dnd--container"
    data-dnd--container-dnd--item-outlet=".nested-fields" 
    data-action="mouseup->dnd--container#disableDrag" >
```

### Item Controller

The main item element specifies (1) the item controller, (2) listeners (dragstart, dragend, dragenter, dragover, dragleave, and drop), and (3) the outlet for the container controller:

```html
<div
    data-controller="dnd--item"
    data-dnd--item-dnd--container-outlet="#container"
    data-action="dragstart->dnd--item#dragStart
                 dragend->dnd--item#dragEnd
                 dragenter->dnd--item#addDropIndicator
                 dragover->dnd--item#allowDrop
                 dragleave->dnd--item#removeDropIndicator
                 drop->dnd--item#drop" >
```

The handle for the item includes the handle target as well as a mousedown listener:

```html
<a href="#" class="btn btn-primary" 
    data-dnd--item-target="handle"
    data-action="mousedown->dnd--item#enableDrag" >
  <i class="fa fa-bars"></i>
</a>
```

There are three additional targets for the item controller:
- id: the form element with the unique item Id
- order: the form element with the order; this value gets updated
- description: only used by the debugger to help identify the row in the logs

### Styling

The [following styles](app/assets/stylesheets/dnd.css) support the feature. The can be customized as needed, though the `pointer-events: none` is required.

| Selector | Notes |
|  --- | --- |
| .dragged | Reduces opacity to highlight which item is being dragged |
| .drop-above | When items are dragged upwards, this draws a line where the item would be dropped |
| .drop-below | When items are dragged dwonwards, this draws a line where the item would be dropped |
| .dropzone .nested-fields * | Prevents events from firing while the drag is occurring (required) |

## Trying It Out

The versions in the repo are a bit dated. I found I had to use node 13 to get yarn to install.

There is a seed file with a sample TODO list.


## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

### Credits

The [underlying TODO app](https://github.com/driftingruby/186-nested-forms-from-scratch-with-stimulusjs) comes from the talented folks at [Drifting Ruby](https://www.driftingruby.com/), from [an episode about nested forms and Stimulus](https://www.driftingruby.com/episodes/nested-forms-from-scratch-with-stimulusjs).

Thanks to [Doug Pace](https://github.com/dmpace) for his help in testing the feature.