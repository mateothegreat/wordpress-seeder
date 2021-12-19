#!/usr/bin/env node

import { Seeder } from './Seeder';
import * as dotenv from 'dotenv';

dotenv.config();

new Seeder();
