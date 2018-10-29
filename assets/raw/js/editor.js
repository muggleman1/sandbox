import Visual from './visuals/helpers/Visual';
import CategoryMap from './visuals/CategoryMap';
import Donut from './visuals/Donut';
import Bar from './visuals/Bar';
import ScaledUpNumber from './visuals/ScaledUpNumber';
import DefaultMap from './visuals/helpers/DefaultMap';
import DonutChartMap from './visuals/DonutChartMap';
import RouteMap from './visuals/RouteMap';
import BubbleChart from './visuals/BubbleChart';
import BubbleMapChart from './visuals/BubbleMapChart';
import FilterMap from './visuals/FilterMap';
import DataView from './visuals/DataView';

function renderEditor(route) {
  const rowContainer = document.createElement('div');
  rowContainer.className = 'row';

  const visualContainer = document.createElement('div');
  visualContainer.className = 'visual col-md-7';
  visualContainer.id = Visual.DEFAULT_RENDER_ID;

  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls col-md-5';
  controlsContainer.id = Visual.DEFAULT_RENDER_CONTROLS_ID;

  const downloadContainer = document.createElement('div');
  downloadContainer.className = 'download';
  downloadContainer.id = 'download';

  const page = document.getElementById('page');
  page.classList.remove('container');
  page.classList.add('container-fluid');

  rowContainer.appendChild(visualContainer);
  rowContainer.appendChild(controlsContainer);
  page.appendChild(rowContainer);
  page.appendChild(downloadContainer);

  if (route.length === 2) {
    let visual = null;
    const config = {
      dataSet: route[0],
      type: route[1],
      attributes: {},
    };

    switch (route[1]) {
      case 'Category-Map':
        visual = new CategoryMap(config);
        break;
      case 'Donut-Chart':
        visual = new Donut(config);
        break;
      case 'Bar-Chart':
        visual = new Bar(config);
        break;
      case 'Scaled-Up-Number':
        visual = new ScaledUpNumber(config);
        break;
      case 'Donut-Chart-Map':
        visual = new DonutChartMap(config);
        break;
      case 'Data-View':
        visual = new DataView(config);
        break;
      case 'Default-Map':
        visual = new DefaultMap(config);
        break;
      case 'Route-Map':
        visual = new RouteMap(config);
        break;
      case 'Bubble-Chart':
        visual = new BubbleChart(config);
        break;
      case 'Bubble-Map-Chart':
        visual = new BubbleMapChart(config);
        break;
      case 'Filter-Map':
        visual = new FilterMap(config);
        break;
      default:
        visualContainer.innerHTML = `<p>Error: could not find visualization: ${route[1]}.`;
    }

    if (visual !== null) {
      visual.fetchAndRenderWithControls();
    }
  } else {
    visualContainer.innerHTML = '<p>An error occured.';
  }
}

export default renderEditor;
