import { handleActions } from 'redux-actions';

import * as model from './model'


// Actions

const PREFIX = 'TEST_RUNS';

const GET_LATEST_TEST_RUNS = `${PREFIX}/GET_LATEST_TEST_RUNS`;
const GET_LATEST_TEST_RUNS_FULFILLED = `${GET_LATEST_TEST_RUNS}_FULFILLED`;

const GET_LATEST_TEST_RUNS_WITH_STATS = `${PREFIX}/GET_LATEST_TEST_RUNS_WITH_STATS`;
const GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED = `${GET_LATEST_TEST_RUNS_WITH_STATS}_FULFILLED`;

const CREATE_TEST_RUN = `${PREFIX}/CREATE_TEST_RUN`;
const CREATE_TEST_RUN_FULFILLED = `${CREATE_TEST_RUN}_FULFILLED`;


// Action creators

export function loadTestRunsPage() {
  return async dispatch => {
    await dispatch(getLatestTestRuns());
    await dispatch(getLatestTestRunsWithStats());
    return null;
  };
}

export function getLatestTestRuns() {
  return {
    type: GET_LATEST_TEST_RUNS,
    payload: model.getLatestsTestRuns(),
  };
}

export function getLatestTestRunsWithStats() {
  return {
    type: GET_LATEST_TEST_RUNS_WITH_STATS,
    payload: model.getLatestsTestRunsWithStats(),
  };
}

export function createTestRun({ type }) {
  return {
    type: CREATE_TEST_RUN,
    payload: model.createTestRun({ type }),
  };
}

export function purgeThenReload({ selectedTestRunIds }) {
  return async dispatch => {
    await model.deleteManyTestRuns({ testRunIds: selectedTestRunIds });
    await dispatch(loadTestRunsPage());
    return null;
  };
}


// Reducer

const initialState = {
  testRuns: [],
};

export const testRuns = handleActions({

  [GET_LATEST_TEST_RUNS_FULFILLED]: (state, action) => ({
    ...state,
    testRuns: action.payload,
  }),

  [GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED]: (state, action) => ({
    ...state,
    testRuns: action.payload,
  }),

  [CREATE_TEST_RUN_FULFILLED]: (state, action) => ({
    ...state,
    testRuns: [
      action.payload,
      ...state.testRuns,
    ],
  }),

}, initialState);
