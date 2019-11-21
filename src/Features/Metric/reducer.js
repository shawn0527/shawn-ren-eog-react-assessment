import * as actions from "./actions";

const initialState = {
  selectedMetrics: [],
  allMetrics: [],
  allPlots: {},
  livePlots: {}
};

const allMetricsDataRecevied = (state, action) => {
  const allMetrics = action.getAllMetrics;
  return {
    ...state,
    allMetrics
  };
};

const selectedMetricsDataReceived = (state, action) => {
  const selectedMetrics = action.selectedMetrics;
  return {
    ...state,
    selectedMetrics
  };
};

const allDataRecevied = (state, action) => {
    const currentPlots = action.currentPlots;
    const livePlots = state.livePlots
    const allPlots = state.allPlots
    if(!!currentPlots) {
      const newMeasurement = currentPlots[currentPlots.length-1];
      const metricName = newMeasurement.metric
      allPlots[metricName] = currentPlots
      livePlots[metricName] = newMeasurement
    };
    return {
      ...state,
      livePlots,
      allPlots
    }
  };
  

const handlers = {
  [actions.ALL_DATA_RECEIVED]: allDataRecevied,
  [actions.ALL_METRICS_DATA_RECEIVED]: allMetricsDataRecevied,
  [actions.SELECTED_METRICS_RECEIVED]: selectedMetricsDataReceived
};

export const reducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};