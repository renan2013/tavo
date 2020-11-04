 // import contacts from '@/views/apps/chat/contacts'

 export default {
     chatDataOfUser: state => id => {
         let chatOfUser = state.chats;
         //AJUSTE POR ADEMAR  RETORNA TODO EL CHAT
         //console.log("chat recuperado formato", chatOfUser);
         return chatOfUser; //state.chats[Object.keys(state.chats)]


         //return state.chats[Object.keys(state.chats).find(key => Number(key) === id)]

     },

     chatDataOfUserU: state => id => {
         alert("chatDataOfUserU" + id);

         return state.chats[Object.keys(state.chats).find(key => Number(key) === id)]

     },

     chatContacts: (state, getters) => {
         const chatContacts = state.chatContacts.filter((contact) => contact.displayName.toLowerCase().includes(state.chatSearchQuery.toLowerCase()))
         return chatContacts; //ademar revisar 

         if (getters.chatLastMessaged(0))
             chatContacts.sort((x, y) => {
                 if (getters.chatLastMessaged(x.uid).msg) { //ademar 
                     const timeX = getters.chatLastMessaged(x.uid).time
                     const timeY = getters.chatLastMessaged(y.uid).time
                     return new Date(timeY) - new Date(timeX)
                 }
             })

         return chatContacts.sort((x, y) => {
             const chatDataX = getters.chatDataOfUser(x.uid)
             const chatDataY = getters.chatDataOfUser(y.uid)
             if (chatDataX && chatDataY) return chatDataY.isPinned - chatDataX.isPinned
             else return 0
         })
     },
     contacts: (state) => state.contacts.filter((contact) => contact.displayName.toLowerCase().includes(state.chatSearchQuery.toLowerCase())),

     contact: (state) => (contactId) => state.contacts.find((contact) => contact.uid === contactId),
     //contact: (state) => (contactId) => state.contacts,


     chats: (state) => state.chats,

     chatUser: (state, getters, rootState) => id => state.contacts.find((contact) => contact.uid === id) || rootState.AppActiveUser,

     chatLastMessaged: (state, getters) => id => {

         if (state.chats.msg)
             return state.chats.msg[0]
         else return false
     },

     chatUnseenMessages: (state, getters) => id => {

         let unseenMsg = 0
         const chatData = state.chats
         if (chatData.msg) {
             chatData.msg.map((msg) => {
                 if (!msg.isSeen && !msg.isSent) unseenMsg++
             })
         }
         return unseenMsg
     },
     /// traido dechat 2
     user(state) {
         if (!state.token) return null;
         const base64Url = state.token.split('.')[1];
         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
         }).join(''));
         return JSON.parse(jsonPayload);
     }
 }