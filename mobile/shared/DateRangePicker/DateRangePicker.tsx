import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
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

const width = Dimensions.get('screen').width;

export interface DateRangePickerState {
  date?: moment.Moment | null;
  startDate?: moment.Moment | null;
  endDate?: moment.Moment | null;
  selecting?: boolean;
}

interface DateRangePickerProps {
  startDate?: moment.Moment | null;
  endDate?: moment.Moment | null;
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
  minDate,
  date,
  maxDate,
  range,
  presetButtons,
  open
}) => {
  const today = moment();

  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState<JSX.Element[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [dayHeaders, setDayHeaders] = useState<JSX.Element[]>([]);
  const [displayedDate, setDisplayedDate] = useState(today);

  const _onOpen = () => {
    if (typeof open !== 'boolean') onOpen();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelecting(false);
    if (!endDate) {
      onChange({
        endDate: startDate
      });
    }
  };

  const previousMonth = () => {
    setDisplayedDate(moment(displayedDate.subtract(1, 'months')));
  };

  const nextMonth = () => {
    setDisplayedDate(moment(displayedDate.add(1, 'months')));
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

  const onClickToday = () => {
    if (range) {
      setSelecting(true);
      onChange({
        date: null,
        startDate: today,
        endDate: null,
        selecting: true
      });
    } else {
      setSelecting(false);
      onChange({
        date: today,
        startDate: null,
        endDate: null
      });
    }
  };

  const thisWeek = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: today.startOf('week'),
      endDate: today.endOf('week')
    });
  };

  const thisMonth = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: today.startOf('month'),
      endDate: today.endOf('month')
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
            onChange({ startDate: _date });
          } else {
            setSelecting(!selecting);
            onChange({ endDate: _date });
          }
        } else {
          setSelecting(!selecting);
          onChange({
            date: null,
            endDate: null,
            startDate: _date
          });
        }
      } else {
        onChange({
          date: _date,
          startDate: null,
          endDate: null
        });
      }
    },
    [moment, onChange, range, selecting, startDate]
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
      for (let i = 0; i < 7; ++i) {
        let day = today.weekday(i).format('dddd').substr(0, 2);
        _dayHeaders.push(<Header key={`dayHeader-${i}`} day={day} index={i} />);
      }
      return _dayHeaders;
    }

    function populateWeeks() {
      let _weeks = [];
      let startOfMonth = displayedDate.startOf('month');
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

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)}>
      <Modal
        onBackdropPress={() => setIsOpen(false)}
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
          <View style={styles.modalTitle}>
            <Text>{displayedDate.format('MMMM') + ' ' + displayedDate.format('YYYY')}</Text>
          </View>
          <View style={[styles.container]}>
            <View style={{ minHeight: 446 }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={previousMonth}>
                  <FontAwesome5 name="chevron-left" size={12} color={'#FC427B'} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {displayedDate.format('MMMM') + ' ' + displayedDate.format('YYYY')}
                </Text>
                <TouchableOpacity onPress={nextMonth}>
                  <FontAwesome5 name="chevron-right" size={12} color={'#FC427B'} />
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
            <Text>Data de Início</Text>
            <FontAwesome5 name="arrow-right" size={15} color="#6c757d"></FontAwesome5>
            <Text>Data de Fim</Text>
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
    paddingBottom: 10,
    alignItems: 'center'
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
