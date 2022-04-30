import { Repository } from '@zen/prisma';
import { Gibberish } from '../models';

export class GibberishRepository extends Repository(Gibberish) {}
