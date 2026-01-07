import BeatLoader from "react-spinners/BeatLoader";

const Loader = (props: any) => {
    return (
        <BeatLoader
            color={'#01807b'}
            loading={props.loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};
export default Loader;
