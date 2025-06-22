import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import { Task } from '../types/task';

interface Props {
  tasks: Task[];
  onSelectDate?: (date: Date) => void;
  onTaskPress?: (task: Task) => void;
}

// Helper to get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export const CalendarView: React.FC<Props> = ({ tasks, onSelectDate, onTaskPress }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Map tasks by date (YYYY-MM-DD)
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    tasks.forEach(task => {
      const dateKey = task.dueDate.slice(0, 10);
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(task);
    });
    return map;
  }, [tasks]);

  // Get first day of month (0=Sun, 1=Mon...)
  const firstDay = new Date(year, month, 1).getDay();
  const weeks: Array<Array<number | null>> = [];
  let week: Array<number | null> = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week.concat(Array(7 - week.length).fill(null)));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Text key={day} style={styles.headerText}>{day}</Text>
        ))}
      </View>
      {weeks.map((week, i) => (
        <View key={i} style={styles.week}>
          {week.map((d, j) => {
            if (!d) return <View key={j} style={styles.dayCell} />;
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayTasks = tasksByDate[dateKey] || [];
            return (
              <TouchableOpacity
                key={j}
                style={[styles.dayCell, today.getDate() === d ? styles.today : null]}
                onPress={() => onSelectDate?.(new Date(year, month, d))}
                accessibilityLabel={`Day ${d}, ${dayTasks.length} tasks`}
              >
                <Text style={styles.dayText}>{d}</Text>
                {dayTasks.length > 0 && (
                  <View style={styles.dot} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.card, borderRadius: 16, padding: 12, margin: 8, elevation: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  headerText: { color: COLORS.text, fontWeight: '600', width: 28, textAlign: 'center' },
  week: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCell: { width: 28, height: 36, alignItems: 'center', justifyContent: 'center', margin: 2, borderRadius: 8 },
  today: { backgroundColor: COLORS.accent },
  dayText: { color: COLORS.text },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent, marginTop: 2 },
});

// TODO: Add month navigation, show tasks on date tap, and accessibility improvements
