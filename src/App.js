import React, { useState } from 'react';
import Die from './Components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

const App = () => {
	const [dice, setDice] = useState(() => allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [buttonText, setButtonText] = useState("Roll")

	React.useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const firstElement = dice[0].value;
		const everySame = dice.every(die => die.value === firstElement)
		if (allHeld && everySame){
			setTenzies(true)
			// console.log("you won baby");
			setButtonText("Restart?")
		}
	}, [dice])
	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid()
			});
		}
		return newDice
	}
	function generateNewDie(dice) {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push({
				value: (dice[i].isHeld) ? dice[i].value : Math.ceil(Math.random() * 6),
				isHeld: dice[i].isHeld,
				id: dice[i].id
			});
		}
		return newDice
	}
	// console.log(dice)
	function rollDice() {
		if (!tenzies) setDice(generateNewDie(dice))
		else {
			setTenzies(false)
			setDice(allNewDice())
			setButtonText("Roll")
		}
	}
	function holdDice(id) {
		setDice(prevDice => {
			return prevDice.map(die => {
				if (die.id === id) {
					return { ...die, isHeld: !die.isHeld };
				} else {
					return die;
				}
			});
		});
	};

	const diceElements = dice.map(die => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			onHold={() => holdDice(die.id)} // Pass a function that toggles hold state for the die with its id
		/>
	));

	// console.log(diceElements);
	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className='dice-container'>
				{diceElements}
			</div>
			<button onClick={rollDice} className='roll-dice'>
				{buttonText}
			</button>
		</main>
	)
}
export default App