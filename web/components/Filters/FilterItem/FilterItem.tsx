import { FilterItemProps } from './FilterItem.props';
import styles from './FilterItem.module.css';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import cn from 'classnames';


export const FilterItem = ({ text, filters, filtersActual, filterType, setFilters, setActive }: FilterItemProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={cn(styles.filterItem, {
            [styles.filterActive]: filtersActual[filterType],
        })} onClick={() => {
            setFilters(filters);
            setActive(true);
        }}>
			{filtersActual[filterType]
                ? text + ': ' + (setLocale(router.locale)[filtersActual[filterType] as 'manual'] 
                    ? setLocale(router.locale)[filtersActual[filterType] as 'manual'] 
                    : filtersActual[filterType])
                : text}
		</div>
    );
};

