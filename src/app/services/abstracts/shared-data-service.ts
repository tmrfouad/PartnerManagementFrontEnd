import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface SharedDataService<T> {
    currentItem: Observable<T>;
    currentItems: Observable<T[]>;

    changeCurrentItem(item: T);
    changeCurrentItems(items: T[]);
}
