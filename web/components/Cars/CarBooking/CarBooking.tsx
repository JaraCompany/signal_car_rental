import { CarBookingProps } from './CarBooking.props';
import styles from './CarBooking.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { useState } from 'react';
import { Input } from '../../Common/Input/Input';
import { setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { BookingErrorInterface, BookingInterface } from '../../../interfaces/booking.interface';
import { chechData } from '../../../helpers/booking_car.helper';
import { useDispatch } from "react-redux";
import { getDate } from '../../../helpers/date.helper';
import { Htag } from '../../Common/Htag/Htag';


export const CarBooking = ({ carId }: CarBookingProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const car = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});

    const [clientName, setClientName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [finishDate, setFinishDate] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const errData: BookingErrorInterface = {
        errName: false,
        errPhone: false,
        errStart: false,
        errFinish: false,
    };

    const [error, setError] = useState<BookingErrorInterface>(errData);

	if (car) {
        const bookingCarData: BookingInterface = {
            clientName: clientName,
            phone: phone,
            startDate: startDate,
            finishDate: finishDate,
            car: car,
        };

		return (
			<div className={styles.carBooking}>
                <Input type="text" text={setLocale(router.locale).your_name} value={clientName}
                    error={error.errName} onChange={(e) => setClientName(e.target.value)} />
                <Input type="phone" text={setLocale(router.locale).phone_number} value={phone}
                    error={error.errPhone} onChange={(e) => setPhone(e.target.value)} />
                <Input type="date" text={setLocale(router.locale).start} value={startDate} minDate={getDate()}
                    error={error.errStart} onChange={(e) => setStartDate(e.target.value)} />
                <Input type="date" text={setLocale(router.locale).finish} value={finishDate} minDate={getDate()}
                    error={error.errFinish} onChange={(e) => setFinishDate(e.target.value)} />
                <Htag tag='l' className={styles.car_price}>
					{setLocale(router.locale).booking_price + ': ' + car.price * 0.1 + '₾'}
				</Htag>
                <Htag tag='m' className={styles.car_counter}>
					{setLocale(router.locale).available_cars_left + ': ' + car.counter}
				</Htag>
                <Button text={car.counter > 0 ? setLocale(router.locale).book_car : setLocale(router.locale).no_cars}
                    isActive={car.counter > 0} isLoading={isLoading}
                    onClick={() => chechData(bookingCarData, errData, dispatch, setIsLoading, setError, router)} />
			</div>
		);
	} else {
		return <></>
	}
};
