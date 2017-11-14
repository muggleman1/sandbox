
class EditorGenerator {
  constructor(container) {
    this.container = container;
  }

  createTextField(id, title, onTextChanged) {
    const context = { id, title };
    this.handlebarsWithContext('text-field-entry', context);
    $(`#${id} > input`).on('input', onTextChanged);
  }

  createSelectBox(id, title, options, current, onOptionChanged) {
    const context = { id, title, options };
    this.handlebarsWithContext('select-entry', context);
    $(`#${id}-select`).val(current).material_select();
    $(`#${id}-select`).change(onOptionChanged);
    console.log(`Using ${current}`);
  }
  createMultipleSelectBox(id, title, options, current, onOptionChanged) {
    const context = { id, title, options };
    this.handlebarsWithContext('select-multiple-entry', context);
    $(`#${id}-select`).val(current).material_select();
    $(`#${id}-select`).change(onOptionChanged);
    console.log(`Using ${current}`);
  }

  createDataFilter(id, column, category, onColumn) {
    const context = { id, column, category };
    this.handlebarsWithContext('data-filter', context);
    $(`#${id}-columnSelect`).val(0).material_select();
    $(`#${id}-operations`).val(1).material_select();
    $(`#${id}-categories`).val(2).material_select();
    $(`#${id}-columnSelect`).on('change', onColumn);
  }
  createNumericFilter(id, column, onChange) {
    const context = { id, column };
    this.handlebarsWithContext('numeric-filter', context);
    $(`#${id}-columnSelect`).val(0).material_select();
    $(`#${id}-operations`).val(1).material_select();
    $(`#${id}`).on('change', onChange);
  }

  createCheckBox(id, title, current, onOptionChanged) {
    let checked = '';
    if (current === true) {
      checked = 'checked';
    }
    const context = { id, title, checked };

    this.handlebarsWithContext('check-entry', context);
    $(`#${id}-checkbox`).change(onOptionChanged);
  }

  createNumberSlider(id, title, current, min, max, onValueChanged) {
    const context = { id, title, min, max, current };
    this.handlebarsWithContext('range-entry', context);
    $(`#${id} input`).on('input', onValueChanged);
  }

  createRangeSlider() {

  }

  createHeader(text) {
    const context = { text };
    this.handlebarsWithContext('header-one', context);
  }

  createCategoryEditor() {

  }
  createMoveableList(id, title, color, onChange, onColor) {
    const context = { id, color, title };
    this.handlebarsWithContext('moveable', context);
    $(`#${id}-up`).on('click', onChange);
    $(`#${id}-dn`).on('click', onChange);
    $(`#${id}-color`).on('change', onColor);
  }

  createButton(id, text, activationFunction) {
    const context = { id, text };
    this.handlebarsWithContext('button', context);
    $(`#${id}`).on('click', activationFunction);
  }

  handlebarsWithContext(handlebarId, context) {
    const source = document.getElementById(handlebarId).innerHTML;
    const template = Handlebars.compile(source);
    const html = template(context);

    $(this.container).append(html);
  }
}

export default EditorGenerator;
