import styles from './Footer.module.css';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { Htag } from '../Htag/Htag';
import { setFooterYear } from '../../../helpers/footer_year.helper';


export const Footer = (): JSX.Element => {
    const router = useRouter();
    
    return (
        <footer className={styles.footer}>
            <Htag tag='m' className={styles.name}>
                {'© ' + setFooterYear(2024) + ' ' + setLocale(router.locale).signal_car}
            </Htag>
			<Htag tag='m'>
                {setLocale(router.locale).offer}
            </Htag>
            <Htag tag='m'>
                {setLocale(router.locale).privacy_policy}
            </Htag>
		</footer>
    );
};
