import React from 'react';
import styles from './App.less';

function App() {

    const [counter, setCounter] = React.useState(0);
    const onButtonClick = () => {
        setCounter(counter + 1);
    }

	return (
		<div className={styles.app}>
			<h1 className={styles.appText}>Hello World!</h1>
            <div className={styles.testBlock}>
                <input type="text" data-cy="input" />
                <div data-cy="counter">{counter}</div>
                <button data-cy="button" onClick={onButtonClick}>Increment Counter</button>
            </div>
		</div>
	);
}

export default App;
