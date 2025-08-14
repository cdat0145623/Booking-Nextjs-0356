import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi";
import PropTypes from "prop-types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

// eslint-disable-next-line no-unused-vars
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // console.log("confirmedStays", confirmedStays);
    const numBookings = bookings.length;

    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const checkins = confirmedStays.length;

    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);
    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                value={numBookings}
                icon={<HiOutlineBriefcase />}
            />

            <Stat
                title="Sales"
                color="green"
                value={formatCurrency(sales)}
                icon={<HiOutlineBanknotes />}
            />

            <Stat
                title="Check ins"
                color="indigo"
                value={checkins}
                icon={<HiOutlineCalendarDays />}
            />

            <Stat
                title="Occupancy rate"
                color="yellow"
                value={Math.round(occupation * 100) + "%"}
                icon={<HiOutlineChartBar />}
            />
        </>
    );
}

Stats.propTypes = {
    bookings: PropTypes.oneOfType([PropTypes.array]),
    confirmedStays: PropTypes.oneOfType([PropTypes.array]),
    numDays: PropTypes.number,
    cabinCount: PropTypes.number,
};

export default Stats;
