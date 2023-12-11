import axios from "axios";

// 가는편 항공권 조회 목록
export const goList = (roundTrip, departure, destination, departureDate, pasCount ) => axios.get("/booking/goList", { params : { roundTrip, departure, destination, departureDate, pasCount } })

// 오는편 항공권 조회 목록
export const comeList = (roundTrip, departure, destination, departureDate, pasCount ) => axios.get("/booking/comeList", { params : { roundTrip, departure, destination, departureDate, pasCount } })

// 가는 편 좌석 현황
export const selectDepSeatStatus = (booking) => axios.get(`/booking/seat?productNoDeps=${booking.productNoDeps}`)

// 오는 편 좌석 현황
export const selectDesSeatStatus = (booking) => axios.get(`/booking/seat_rt?departure=${booking.departure}&destination=${booking.destination}`)

// 예매 완료된 좌석 현황 불러오기
export const bookedSeatList = (flightNo) => axios.get(`/booking/seatStatus/${flightNo}`)

// 선택한 항공권 조회
export const getNotice = (roundTrip, pasCount, passengerNames, phones, seatNoDeps, seatNoDess) => axios.get("/booking/notice", { params : { roundTrip, pasCount, passengerNames, phones, seatNoDeps, seatNoDess } })

// 결제 정보 조회
export const getPayment = (roundTrip, pasCount, passengerNames, phones, seatNoDepss, payment) => axios.get("/booking/payment", { params : { roundTrip, pasCount, passengerNames, phones, seatNoDepss, payment } })
