import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadCars, addCar, updateCar, removeCar, addCarMsg } from '../store/car.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { carService } from '../services/car.service'

export function CarIndex() {

    const cars = useSelector(storeState => storeState.carModule.cars)

    useEffect(() => {
        loadCars()
    }, [])

    async function onRemoveCar(carId) {
        try {
            await removeCar(carId)
            showSuccessMsg('Car removed')            
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = carService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }        
    }

    async function onUpdateCar(car) {
        const price = +prompt('New price?', car.price)
        const carToSave = { ...car, price }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }        
    }

    

    function shouldShowActionBtns(car) {
        return true
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return car.owner?._id === user._id
    }

    return (
        <div>
            <h3>Cars App</h3>
            <main>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <ul className="car-list">
                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <Link to={`${car._id}`}>
                                <h4>{car.vendor}</h4>
                           </Link>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            {shouldShowActionBtns(car) && <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>}
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}