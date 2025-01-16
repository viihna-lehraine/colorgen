// File: src/classes/idb/instance.ts

import { data } from '../../data/index.js';
import { IDBManager } from './IDBManager.js';

export const idbInstance = await IDBManager.createInstance(data);
