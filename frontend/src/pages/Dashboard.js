import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';
import { getGoals, reset } from '../features/goals/goalSlice';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth);
	const { goals, isLoading, isError, message } = useSelector(
		state => state.goals
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			// if user is not logged in, redirect to /login
			navigate('/login');
		}

		dispatch(getGoals());

		return () => dispatch(reset());
	}, [user, navigate, dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals Dashboard</p>
			</section>

			<GoalForm />

			<section className="content">
				{goals.length > 0 ? (
					<div className="goals">
						{goals.map(goal => {
							return <GoalItem key={goal._id} goal={goal} />;
						})}
					</div>
				) : (
					<h3>You have no goals to show...</h3>
				)}
			</section>
		</>
	);
};

export default Dashboard;
