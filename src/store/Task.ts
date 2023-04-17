import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { firestore } from '../config/firebase'

interface TaskState {
    tasks: any | null,
    ListTasks: any | null,
    storeTasks: (uid: any, tasks: any) => void;
    getListTasks: (uid: any) => void;
}

const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: null,
            ListTasks: [],
            storeTasks: async (uid: any, tasks: any) => {
                const docRef = await firestore.collection('users').doc().set({
                    uid: uid,
                    tasks: tasks
                })
            },
            getListTasks: async (uid: any) => {
                //loop through the users collection and find a document with the value of uid
                const docRef = await firestore.collection('users').where('uid', '==', uid).get();
                const ListOfTasks : any = [];
                docRef.forEach((doc) => {
                    const tasks = doc.data().tasks;
                    ListOfTasks.push(tasks);

                    set({ ListTasks: ListOfTasks })

                }
                )
            }

        }),
        { name: 'user-storage' }
    )
);



export default useTaskStore;
