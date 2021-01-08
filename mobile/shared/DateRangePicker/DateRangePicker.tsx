import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Button from './Button';
import Day from './Day';
import Header from './Header';

import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export interface DateRangePickerState {
  date?: moment.Moment | null;
  startDate?: moment.Moment | null;
  endDate?: moment.Moment | null;
  selecting?: boolean;
  displayedDate: moment.Moment;
}

interface DateRangePickerProps {
  startDate?: moment.Moment | null;
  endDate?: moment.Moment | null;
  displayedDate: moment.Moment;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  date?: moment.Moment | null;
  range: boolean;
  onChange: (state: DateRangePickerState) => void;
  presetButtons?: boolean;
  open?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  displayedDate,
  minDate,
  date,
  maxDate,
  range,
  children,
  presetButtons,
  open
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState<JSX.Element[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [dayHeaders, setDayHeaders] = useState<JSX.Element[]>([]);

  const _onOpen = () => {
    if (typeof open !== 'boolean') onOpen();
  };

  const _onClose = () => {
    if (typeof open !== 'boolean') onClose();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelecting(false);
    if (!endDate) {
      onChange({
        endDate: startDate,
        displayedDate: moment()
      });
    }
  };

  const previousMonth = () => {
    onChange({
      displayedDate: moment(displayedDate).subtract(1, 'months')
    });
  };

  const nextMonth = () => {
    onChange({
      displayedDate: moment(displayedDate).add(1, 'months')
    });
  };

  const selected = useCallback((_date, _startDate, _endDate, __date) => {
    return (
      (_startDate && _endDate && _date.isBetween(_startDate, _endDate, null, '[]')) ||
      (_startDate && _date.isSame(_startDate, 'day')) ||
      (__date && _date.isSame(__date, 'day'))
    );
  }, []);

  const disabled = useCallback((_date, _minDate, _maxDate) => {
    return (_minDate && _date.isBefore(_minDate, 'day')) || (_maxDate && _date.isAfter(_maxDate, 'day'));
  }, []);

  const today = () => {
    if (range) {
      setSelecting(true);
      onChange({
        date: null,
        startDate: moment(),
        endDate: null,
        selecting: true,
        displayedDate: moment()
      });
    } else {
      setSelecting(false);
      onChange({
        date: moment(),
        startDate: null,
        endDate: null,
        displayedDate: moment()
      });
    }
  };

  const thisWeek = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: moment().startOf('week'),
      endDate: moment().endOf('week'),
      displayedDate: moment()
    });
  };

  const thisMonth = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      displayedDate: moment()
    });
  };

  const select = useCallback(
    day => {
      let _date = moment(displayedDate);
      _date.set('date', day);
      if (range) {
        if (selecting) {
          if (_date.isBefore(startDate, 'day')) {
            setSelecting(true);
            onChange({ startDate: _date, displayedDate: _date });
          } else {
            setSelecting(!selecting);
            onChange({ endDate: _date, displayedDate: _date });
          }
        } else {
          setSelecting(!selecting);
          onChange({
            date: null,
            endDate: null,
            startDate: _date,
            displayedDate: _date
          });
        }
      } else {
        onChange({
          date: _date,
          startDate: null,
          endDate: null,
          displayedDate: _date
        });
      }
    },
    [moment, displayedDate, onChange, range, selecting, startDate]
  );

  useEffect(() => {
    if (typeof open === 'boolean') {
      if (open && !isOpen) onOpen();
      else if (!open && isOpen) onClose();
    }
  }, [open]);

  useEffect(() => {
    function populateHeaders() {
      let _dayHeaders = [];
      for (let i = 0; i <= 6; ++i) {
        let day = moment(displayedDate).weekday(i).format('dddd').substr(0, 2);
        _dayHeaders.push(<Header key={`dayHeader-${i}`} day={day} index={i} />);
      }
      return _dayHeaders;
    }

    function populateWeeks() {
      let _weeks = [];
      let startOfMonth = moment(displayedDate).set('date', 1);
      let offset = startOfMonth.weekday();
      let week = Array.from({ length: offset }, (x, i) => <Day empty key={'empty-' + i} />);
      let daysInMonth = displayedDate.daysInMonth();
      week = week.concat();
      for (let i = 1; i <= daysInMonth; ++i) {
        let _date = moment(displayedDate).set('date', i);
        let _selected = selected(_date, startDate, endDate, date);
        let _disabled = disabled(_date, minDate, maxDate);
        week.push(
          <Day key={`day-${i}`} index={i} selected={_selected} disabled={_disabled} select={() => select(i)} />
        );
        if ((i + offset) % 7 === 0 || i === daysInMonth) {
          if (week.length < 7) {
            week = week.concat(
              Array.from({ length: 7 - week.length }, (x, index) => <Day empty key={'empty-' + index} />)
            );
          }
          _weeks.push(
            <View key={'weeks-' + i} style={styles.week}>
              {week}
            </View>
          );
          week = [];
        }
      }
      return _weeks;
    }
    function populate() {
      let _dayHeaders = populateHeaders();
      let _weeks = populateWeeks();
      setDayHeaders(_dayHeaders);
      setWeeks(_weeks);
    }
    populate();
  }, [startDate, endDate, date, moment, displayedDate, selected, disabled, minDate, maxDate, select]);

  const node = (
    <View>
      <TouchableWithoutFeedback onPress={_onOpen}>
        {children ? (
          children
        ) : (
          <View>
            <Text>Click me to show date picker</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
    </View>
  );

  return isOpen ? (
    <>
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback style={styles.closeTrigger} onPress={_onClose}>
          <View style={styles.closeContainer} />
        </TouchableWithoutFeedback>
        <View>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={previousMonth}>
                <FontAwesome5 name="chevron-left" size={12} color={'#FC427B'} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{displayedDate.format('MMMM') + ' ' + displayedDate.format('YYYY')}</Text>
              <TouchableOpacity onPress={nextMonth}>
                <FontAwesome5 name="chevron-right" size={12} color={'#FC427B'} />
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              {dayHeaders && <View style={styles.dayHeaderContainer}>{dayHeaders}</View>}
              {weeks}
            </View>
            {presetButtons && (
              <View style={styles.buttonContainer}>
                <Button onPress={today}>Today</Button>
                {range && (
                  <>
                    <Button onPress={thisWeek}>This Week</Button>
                    <Button onPress={thisMonth}>This Month</Button>
                  </>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
      {node}
    </>
  ) : (
    <>{node}</>
  );
};

export default DateRangePicker;

DateRangePicker.defaultProps = {
  range: false,
  presetButtons: false
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2147483647
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: width * 0.85
  },
  closeTrigger: {
    width: width,
    height: height
  },
  closeContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 15
  },
  calendar: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    padding: 10
  },
  headerText: {
    fontSize: 16,
    color: 'black'
  },
  monthButtons: {
    fontSize: 16,
    color: 'black',
    width: 32,
    height: 32
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 10
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  }
});
