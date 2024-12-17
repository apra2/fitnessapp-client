// Home.js
import Banner from '../components/Banner';

export default function Home() {
    const data = {
        title: "Welcome to Zuitt Workout",
        content: "Your Workout tracker!",
        destination: "/login", // Make sure this points to the correct login route
        buttonLabel: "Login to get Started!"
    };

    return (
        <>
            <Banner data={data} />
        </>
    );
}
