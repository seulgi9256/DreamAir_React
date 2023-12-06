import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import 'moment/locale/ko';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const SearchFlightForm = () => {
  const [roundTrip, setRoundTrip] = useState('왕복 가는편');
  const [departure, setDeparture] = useState('출발지');
  const [destination, setDestination] = useState('도착지');
  const [departureDate, setDepartureDate] = useState('');
  const [pasCount, setPasCount] = useState(1);
  const [showPassengerBox, setShowPassengerBox] = useState(false);
  
  const booking = {
    roundTrip : roundTrip,
    departure : departure,
    destination : destination,
    departureDate : departureDate,
    pasCount : pasCount
  }
  
  // 왕복 날짜
  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  // 왕복 날짜 이벤트
  const handleDateRangeChange = (event, picker) => {
    setDateRange({
      startDate: picker.startDate.format('YYYY/MM/DD'),
      endDate: picker.endDate.format('YYYY/MM/DD'),
    })
  }

  // 왕복 날짜 useEffect
  useEffect( () => {
    setDepartureDate(`${dateRange.startDate} ~ ${dateRange.endDate}`)
  }, [dateRange])

  const [singleDate, setSingleDate] = useState(null);
  
  // 편도 날짜 이벤트
  const handleDateChange = (date) => {
    setSingleDate(date);
  };

  useEffect( () => {
    setDepartureDate(singleDate)
  }, [singleDate])

  const handleRoundTripChange = (value) => {
    setRoundTrip(value);
  };

  const handleDepartureChange = (value) => {
    setDeparture(value);
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  // const handleDepartureDateChange = (e) => {
  //   console.log(e.target.value); 
  //   setDepartureDate(e.target.value);
  // };

  const handlePasCountChange = (value) => {
    console.log(value);
    setPasCount(value);
  };

  useEffect( () => {
    handlePasCountChange(pasCount)
  }, [pasCount])

  const handleIconClick = () => {
    setShowPassengerBox(true);
  };

  const handleDecrease = () => {
    if (pasCount > 1) {
      setPasCount(pasCount - 1);
    }
  };

  const handleIncrease = () => {
    setPasCount(pasCount + 1);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요.

    alert(departureDate)
    console.log('폼 제출됨!');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" id="main_index_back">
      <section id="searchFlight">
        <Container>
          <div className="card card-4" style={{ height: '100%', backgroundColor: '#e7f5fac7' }}>
            <div className="tab-content">
              <div className="tab-pane active" id="tab1">
                <div className="tab_wrap">
                  <Form id="frm">
                    <Row className="d-flex py-2">
                      <Col>
                        <Form.Check
                          type="radio"
                          name="roundTrip"
                          label="왕복"
                          id="round"
                          checked={roundTrip === '왕복 가는편'}
                          onChange={() => handleRoundTripChange('왕복 가는편')}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          name="roundTrip"
                          label="편도"
                          id="eachWay"
                          checked={roundTrip === '편도'}
                          onChange={() => handleRoundTripChange('편도')}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Floating>
                          <Form.Select
                            name="departure"
                            id="floatingSelectGrid"
                            value={departure}
                            onChange={(e) => handleDepartureChange(e.target.value)}
                          >
                            <option value="출발지" disabled>출발지</option>
                            <option value="김포">김포</option>
                            <option value="제주">제주</option>
                            <option value="울산">울산</option>
                            <option value="부산">부산</option>
                            <option value="여수">여수</option>
                          </Form.Select>
                          <label htmlFor="floatingSelectGrid">출발지</label>
                        </Form.Floating>
                      </Col>
                      <Col>
                        <Form.Floating>
                          <Form.Select
                            name="destination"
                            id="floatingSelectGrid"
                            value={destination}
                            onChange={(e) => handleDestinationChange(e.target.value)}
                          >
                            <option value="도착지" disabled>도착지</option>
                            <option value="김포">김포</option>
                            <option value="제주">제주</option>
                            <option value="울산">울산</option>
                            <option value="부산">부산</option>
                            <option value="여수">여수</option>
                          </Form.Select>
                          <label htmlFor="floatingSelectGrid">도착지</label>
                        </Form.Floating>
                      </Col>
                      <Col>
                          {(roundTrip === '왕복 가는편') && (
                            <Form.Floating>
                                <DateRangePicker
                                  startDate={dateRange.startDate}
                                  endDate={dateRange.endDate}
                                  onApply={handleDateRangeChange}
                                  > 
                                <Form.Control
                                  type="text"
                                  name="departureDate"
                                  placeholder="yyyy/mm/dd"
                                  id="input-start"
                                />
                                </DateRangePicker>
                              <label htmlFor="floatingSelectGrid">여정</label>
                            </Form.Floating>
                          )}

                          {(roundTrip === '편도') && (
                            <Form.Floating>
                                <DatePicker
                                  selected={singleDate}
                                  onChange={handleDateChange}
                                  dateFormat="yyyy/MM/dd" // 날짜 표시 형식 지정
                                  // placeholderText="날짜를 선택하세요" // 선택 전 플레이스홀더 텍스트
                                  locale="ko" // 한국어 지원
                                  id="input-start"
                                />
                                {/* <Form.Control
                                  type="text"
                                  name="departureDate"
                                  placeholder="yyyy/mm/dd"
                                  id="input-start"
                                /> */}
                              {/* <label htmlFor="floatingSelectGrid">여정</label> */}
                            </Form.Floating>
                          )}
                      </Col>
                      <Col>
                        <div className="passenger">
                          <Form.Floating>
                            <div className="text-center" id='icon_click' onClick={handleIconClick}>
                              탑승객
                              <Form.Control className="form-control" readOnly />
                            </div>
                            {showPassengerBox && (
                              <div className="number_box">
                                <div className="d-flex position-absolute bottom-0">
                                  <Button type="button" className="down btn btn-danger" onClick={handleDecrease}>
                                    -
                                  </Button>
                                  <Form.Control
                                    className="inputQty text-center"
                                    type="number"
                                    min="0"
                                    max="999"
                                    value={pasCount}
                                    name="pasCount"
                                    id="adult"
                                    onChange={(e) => handlePasCountChange(e.target.value)}
                                  />
                                  <Button type="button" className="up btn btn-success" onClick={handleIncrease}>
                                    +
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Form.Floating>
                        </div>
                      </Col>
                    </Row>

                    <div className="search_btn pt-2">
                      <Button id="booking_btn" onClick={handleSubmit} className="btn btn-primary">
                        검색
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SearchFlightForm;