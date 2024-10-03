import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Math.random().toString(), title: task, completed: false }]);
      setTask('');
    }else{
      Toast.show({
        text1: 'Error',
        text2: 'The task cannot be empty',
        type: 'error', // O 'success', 'info', etc.
      })
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.taskContainer}>
              <Ionicons
                name={item.completed ? 'checkmark-done' : 'square-outline'}
                size={24}
                color={item.completed ? 'green' : 'gray'}
                style={{ marginRight: 10 }}
              />
              <Text style={item.completed ? styles.completedTask : styles.task}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="Delete task" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskList;
