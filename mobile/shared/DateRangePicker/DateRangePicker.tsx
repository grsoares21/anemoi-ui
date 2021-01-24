import React, { useState, useEffect, useCallback } from 'react';
import {
  sub,
  add,
  isSameDay,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  setDate,
  setDay,
  format,
  getDay,
  getDaysInMonth
} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import Day from './Day';
import Header from './Header';

import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { endOfMonth } from 'date-fns/esm';

const width = Dimensions.get('screen').width;

interface DateRangePickerProps {
  displayedStartDate?: Date;
  displayedEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  range: boolean;
  onSelectPeriod?: (dates: { startDate: Date; endDate: Date }) => void;
  onSelectDate?: (date: Date) => void;
  presetButtons?: boolean;
  open?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onSelectPeriod,
  onSelectDate,
  displayedEndDate,
  displayedStartDate,
  minDate,
  maxDate,
  range,
  presetButtons,
  open
}) => {
  const today = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState<JSX.Element[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dayHeaders, setDayHeaders] = useState<JSX.Element[]>([]);
  const [displayedMonthDate, setDisplayedMonthDate] = useState(today);

  const _onOpen = () => {
    if (typeof open !== 'boolean') onOpen();
  };

  const onOpen = () => {
    setIsOpen(true);
    setSelecting(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDate(undefined);
  };

  const onClose = () => {
    setIsOpen(false);
    if (range) {
      onSelectPeriod && startDate && endDate && onSelectPeriod({ startDate, endDate });
    } else {
      onSelectDate && selectedDate && onSelectDate(selectedDate);
    }
  };

  const previousMonth = () => {
    setDisplayedMonthDate(sub(displayedMonthDate, { months: 1 }));
  };

  const nextMonth = () => {
    setDisplayedMonthDate(add(displayedMonthDate, { months: 1 }));
  };

  const selected = useCallback((_date: Date, _startDate?: Date, _endDate?: Date, __date?: Date) => {
    return (
      (_startDate && _endDate && isAfter(_date, _startDate) && isBefore(_date, _endDate)) ||
      (_startDate && isSameDay(_date, _startDate)) ||
      (_endDate && isSameDay(_date, _endDate)) ||
      (__date && isSameDay(_date, __date))
    );
  }, []);

  const disabled = useCallback((_date: Date, _minDate?: Date, _maxDate?: Date) => {
    return (_minDate && isBefore(_date, _minDate)) || (_maxDate && isAfter(_date, _maxDate));
  }, []);

  const onClickToday = () => {
    if (range) {
      setSelecting(true);
      setStartDate(today);
      setEndDate(undefined);
    } else {
      setSelecting(false);
      setSelectedDate(today);
    }
  };

  const thisWeek = () => {
    setSelecting(false);
    setStartDate(startOfWeek(today));
    setEndDate(endOfWeek(today));
  };

  const thisMonth = () => {
    setSelecting(false);
    setStartDate(startOfMonth(today));
    setEndDate(endOfMonth(today));
  };

  const select = useCallback(
    (day: number) => {
      let _date = displayedMonthDate;
      _date = setDate(_date, day);
      if (range) {
        if (!selecting || (selecting && startDate && isBefore(_date, startDate))) {
          setSelecting(true);
          setStartDate(_date);
        } else {
          setSelecting(false);
          setEndDate(_date);
        }
      } else {
        setSelectedDate(_date);
      }
    },
    [range, selecting, startDate, displayedMonthDate]
  );

  useEffect(() => {
    endDate && onClose();
  }, [endDate]);

  useEffect(() => {
    function populateHeaders() {
      let _dayHeaders = [];
      for (let i = 0; i < 7; ++i) {
        let day = format(setDay(today, i), 'EEEEEE', { locale: pt });
        _dayHeaders.push(<Header key={`dayHeader-${i}`} day={day} index={i} />);
      }
      return _dayHeaders;
    }

    function populateWeeks() {
      let _weeks = [];
      let firstDayOfMonth = startOfMonth(displayedMonthDate);
      let offset = getDay(firstDayOfMonth);
      let week = Array.from({ length: offset }, (x, i) => <Day empty key={'empty-' + i} />);
      let daysInMonth = getDaysInMonth(displayedMonthDate);
      week = week.concat();
      for (let i = 1; i <= daysInMonth; ++i) {
        let _date = setDate(displayedMonthDate, i);
        let _selected = selected(_date, startDate, endDate, selectedDate);
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
  }, [startDate, endDate, selectedDate, displayedMonthDate, selected, disabled, minDate, maxDate, select]);

  return (
    <TouchableOpacity onPress={onOpen}>
      <Modal
        onBackdropPress={onClose}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver
        hideModalContentWhileAnimating
        isVisible={isOpen}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={[styles.modalContainer, { alignItems: 'center' }]}
        >
          <View style={[styles.modalTitle, { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }]}>
            <Text style={{ borderColor: '#FC427B', borderBottomWidth: !selecting ? 2 : 0 }}>
              {startDate ? format(startDate, 'dd/MM/yyyy') : 'Data de Início'}
            </Text>
            <FontAwesome5 name="arrow-right" size={15} color="#6c757d"></FontAwesome5>
            <Text style={{ borderColor: '#FC427B', borderBottomWidth: selecting ? 2 : 0 }}>
              {endDate ? format(endDate, 'dd/MM/yyyy') : 'Data de Fim'}
            </Text>
          </View>
          <View style={[styles.container]}>
            <View style={{ minHeight: 446 }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={previousMonth} style={styles.monthButtons}>
                  <FontAwesome5 name="chevron-left" size={20} color={'#FC427B'} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {format(displayedMonthDate, 'MMMM', { locale: pt }) + ' ' + format(displayedMonthDate, 'yyyy')}
                </Text>
                <TouchableOpacity onPress={nextMonth} style={styles.monthButtons}>
                  <FontAwesome5 name="chevron-right" size={20} color={'#FC427B'} />
                </TouchableOpacity>
              </View>
              <View style={styles.calendar}>
                {dayHeaders && <View style={styles.dayHeaderContainer}>{dayHeaders}</View>}
                {weeks}
              </View>
            </View>
            {presetButtons && (
              <View style={styles.buttonContainer}>
                <Button onPress={onClickToday}>Today</Button>
                {range && (
                  <>
                    <Button onPress={thisWeek}>This Week</Button>
                    <Button onPress={thisMonth}>This Month</Button>
                  </>
                )}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View>
        <TouchableWithoutFeedback onPress={_onOpen}>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 10,
              padding: 10,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#ced4da',
              borderRadius: 8
            }}
          >
            <Text>{displayedStartDate ? format(displayedStartDate, 'dd/MM/yyyy') : 'Data de Início'}</Text>
            <FontAwesome5 name="arrow-right" size={15} color="#6c757d"></FontAwesome5>
            <Text>{displayedEndDate ? format(displayedEndDate, 'dd/MM/yyyy') : 'Data de Fim'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
};

export default DateRangePicker;

DateRangePicker.defaultProps = {
  range: false,
  presetButtons: false
};

const styles = StyleSheet.create({
  modalTitle: {
    paddingBottom: 10
  },
  modalContainer: {
    paddingTop: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  container: {
    borderRadius: 8,
    width: width * 0.85
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
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
    paddingVertical: 15,
    paddingHorizontal: 20
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
