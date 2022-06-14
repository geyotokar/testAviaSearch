// TYPE OF JSON
export type FlightsType = {
    hasExtendedFare : boolean
    flight: FlightType
    flightToken: string
}

type RateType = {
    amount: string
    currencyCode: string
}

type PriceType = RateType & { currency: string }

type PassengerType = {
    uid: string
    caption: string
}

type AirlineType = PassengerType & { airlineCode: string }

type FlightType = {
    carrier: AirlineType
    price: {
        total: PriceType
        totalFeeAndTaxes: PriceType
        rates: {
            totalUsd: RateType
            totalEur: RateType
        }
        passengerPrices: [
            {
                total: PriceType
                passengerType: PassengerType
                singlePassengerTotal: PriceType
                passengerCount: number
                tariff: PriceType
                feeAndTaxes: PriceType
            }
        ]
    }
    servicesStatuses: {
        baggage: PassengerType
        exchange: PassengerType
        refund: PassengerType
    }
    legs: [
        duration: number,
        segments: Array<SegmentType>
    ]
    exchange: {
        ADULT: {
            exchangeableBeforeDeparture: boolean
            exchangeAfterDeparture: PriceType
            exchangeBeforeDeparture: PriceType
            exchangeableAfterDeparture: boolean
        }
    }
    isTripartiteContractDiscountApplied: boolean
    international: boolean
    seats: [{
        count: number
        type: PassengerType
    }]
    refund: {
        ADULT: {
            refundableBeforeDeparture: boolean
            refundableAfterDeparture: boolean
        }
    }
}


export type SegmentType = {
    classOfServiceCode: string
    classOfService: PassengerType
    departureAirport: PassengerType // Departure Airport
    departureCity: PassengerType // Departure City
    aircraft: PassengerType
    travelDuration: number // Duration
    arrivalCity: PassengerType // Arrival City
    arrivalDate: string //Arrival Date
    flightNumber: string
    techStopInfos: []
    departureDate: string // Departure Date
    stops: number // transfers
    servicesDetails: {
        freeCabinLuggage: {}
        paidCabinLuggage: {}
        tariffName: string
        fareBasis: {
            ADULT: string
        }
        freeLuggage: {
            ADULT: {
                pieces: number
                nil: boolean
                unit: string
            }
        }
        paidLuggage: {}
    }
    airline: AirlineType
    starting: boolean
    arrivalAirport: PassengerType
}