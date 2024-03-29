import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categorySaga() {
  yield all([call(onFetchCategories)]); // its basically a pause to complete this line first then move down
}
