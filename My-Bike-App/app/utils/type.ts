export type formCarDataType = {
    id: number,
    carName: string,
    carModel: string,
    carPrice: number,
    carBrand: string,
    carColor: string[],
    carFuel: string
}

export const carBrand = ["TATA", "Maruti Suzuki", "Mahindra", "Kia", "MG Motor", "Toyota"];
export const carColor = ["Black", "White", "Yellow", "Red", "Green", "Custom"];
export const carFuel = ["Petrol", "Diesel", "EV", "CNG", "Hybrid"];