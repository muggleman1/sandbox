
import EditorGenerator from './helpers/EditorGenerator';
import Visual from './helpers/Visual';
import Filter from './helpers/Filter';

class Counter extends Visual {
  constructor(config) {
    super(config);
    this.attributes.columnOptions = null;
    this.attributes.displayColumns = [];
    this.renderData = [];
    this.attributes.filters = [];
    this.filter = new Filter(this);
    this.applyDefaultAttributes({
      width: 500,
      height: 500,
      font_size: '2em',
      colors: [],
      category_order: '',
    });
  }
  /** ************************************************************************
    Render Methods
  *************************************************************************** */
  /** Renders Controls
  *
  */
  renderControls() {
    this.attributes.dataFilters = [];
    this.attributes.numericFilters = [];
    this.renderData = JSON.parse(JSON.stringify(this.data));
    this.attributes.columnOptions = Object.keys(this.data[0]);
    this.renderControlsDiv = document.getElementById(this.renderControlsID);
    this.renderControlsDiv.innerHTML = '<h4 style = "text-align: center">Controls</h4> <br>';

    const cats = [];
    const allDataCols = Object.keys(this.data[0]);
    for (let i = 0; i < allDataCols.length; i += 1) {
      cats.push({ value: allDataCols[i], text: allDataCols[i] });
    }
    const aggDiv = document.createElement('div');
    this.renderControlsDiv.appendChild(aggDiv);
    this.createAggregationRow(aggDiv, cats);
    const myDiv = document.createElement('div');
    this.renderControlsDiv.appendChild(myDiv);
    this.filter.makeFilterSeries((a, b) => { this.counterHeader(a, b); }, () => { this.render(); }, 'Create Table', myDiv);
  }
  /** Renders the App section
  *
  */
  render() {
    this.filter.getFilteredData(this.attributes.filters);
    this.renderDiv = document.getElementById(this.renderID);
    this.renderDiv.innerHTML = 'Count';
    this.tableDiv = document.createElement('div');
    this.renderDiv.appendChild(this.tableDiv);
    this.tableDiv.id = 'tableDiv';
    if (this.attributes.columnOptions === null) {
      this.columnOptions = [];
    }
    this.displayCount();
  }


  /** Updates app display when actions are taken in controls
  *
  */
  /** Displayes the data table on selected Categories
  *
  */
  displayCount() {
    const renderData = this.renderData;
    let count = 0;
    for (let i = 0; i < renderData.length; i += 1) {
      if (renderData[i] != null) {
        count += 1;
      }
    }
    document.getElementById('tableDiv').innerHTML = `Count: ${count}`;
  }
  static removeFilter(buttonID) {
    buttonID.parentNode.parentNode.remove();
  }


  counterHeader(headEditor, index) {
    headEditor.createRemoveButton(`remove${index}`, (e2) => {
      this.filter.removeSeries(e2.currentTarget);
    });
  }
  createAggregationRow(myDiv, cats, num) {
    myDiv.innerHTML = `<div id=aggDiv${num} class ='col-2'></div><div id=propertyDiv${num} class ='col-6'>
    </div><div id=titleDiv${num} class ='col-2'></div>`;
    const editor = new EditorGenerator(myDiv);
    const operations = [{ value: 'sum', text: 'Sum' }, { value: 'average', text: 'Average' }];
    editor.createSelectBox('AggregationType', 'Operation', operations, 'na', () => {});
    editor.createSelectBox('Check', 'Property', cats, 'na', (e) => {
      this.attributes.displayColumns = $(e.currentTarget).val();
    });
  }
}
export default Counter;
