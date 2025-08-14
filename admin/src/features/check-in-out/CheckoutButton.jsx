import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";

// eslint-disable-next-line no-unused-vars
function CheckoutButton({ bookingId }) {
    const { checkout, isCheckingout } = useCheckout();

    return (
        <Button
            variation="primary"
            size="small"
            onClick={() => checkout(bookingId)}
            disabled={isCheckingout}
        >
            Check out
        </Button>
    );
}

CheckoutButton.propTypes = {
    bookingId: PropTypes.number,
};

export default CheckoutButton;
