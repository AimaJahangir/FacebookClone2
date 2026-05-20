import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Share2,
  Trash2,
  User
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions, FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// ================== ATTRACTIVE MOCK DATA FOR FEED ==================
const initialPosts = [
  {
    id: 1,
    user: "Closet",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "2h",
    content: "My friend 💙 Why you are so quiet what's on your mind ?\nPov:behen ki barat 💖\nCloset's Rawalpindi / Islamabad Studio:... See more",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
    likes: 1240,
    comments: 89,
  },
  {
    id: 2,
    user: "Wanderlust Chronicles",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "4h",
    content: "Chasing sunsets across the mountain ridges today. Heavy mist rolling over the valley peaks this morning. Absolutely magical view ✨⛰️ #travelpakistan #vibes",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    likes: 3420,
    comments: 241,
  },
  {
    id: 3,
    user: "National Geographic Focus",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    time: "1d",
    content: "A stunning candid capture of local wildlife adapting flawlessly to changing seasonal conditions deep in the northern ranges. Drop a ❤️ if you love nature photography!",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&auto=format&fit=crop",
    likes: 9812,
    comments: 542,
  }
];

// ================== LOGIN SCREEN ==================
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.logo}>facebook</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Mobile number or email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={loginStyles.loginBtn} onPress={onLogin}>
        <Text style={loginStyles.loginText}>Log In</Text>
      </TouchableOpacity>
      <Text style={loginStyles.forgotText}>Forgot Password?</Text>
    </View>
  );
}

// ================== HOME SCREEN ==================
function HomeScreen() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const key = `task_${Date.now()}`; 
    const item = { key: key, text: newTask };
    setTasks([...tasks, item]);
    setNewTask('');
  };

  const removeTask = (key) => {
    setTasks(tasks.filter(t => t.key !== key));
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Facebook Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.facebookLogo}>facebook</Text>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconBtn}><Plus size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Search size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><MessageCircle size={24} color="#000" /></TouchableOpacity>
        </View>
      </View>

      {/* Mini To-Do Section */}
      <View style={taskStyles.taskSection}>
        <Text style={taskStyles.taskTitle}>Mini To-Do (Local Key Logic)</Text>
        <View style={taskStyles.inputRow}>
          <TextInput 
            style={taskStyles.input} 
            placeholder="Add new task..." 
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={taskStyles.addBtn} onPress={addTask}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {tasks.map(item => (
          <View key={item.key} style={taskStyles.taskItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.key)}>
              <Trash2 size={18} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {tasks.length > 0 && (
          <TouchableOpacity style={taskStyles.removeAll} onPress={removeAllTasks}>
            <Text style={taskStyles.removeText}>Remove All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Create Post */}
      <View style={styles.createPost}>
        <Image source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} style={styles.profilePic} />
        <TouchableOpacity style={styles.whatsOnMind}>
          <Text style={styles.whatsOnMindText}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>

      {/* Stories Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        <TouchableOpacity style={styles.createStory}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} style={styles.storyBigImage} />
          <View style={styles.plusCircle}>
            <Plus size={28} color="#1877F2" strokeWidth={3} />
          </View>
          <Text style={styles.storyText}>Create story</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storyCard}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300" }} style={styles.storyBigImage} />
          <Text style={styles.storyText}>WordCraft Academy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storyCard}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300" }} style={styles.storyBigImage} />
          <Text style={styles.storyText}>Adanna Duru</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Posts */}
      <FlatList
        data={initialPosts}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time} • 🌍</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{item.content}</Text>
            
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
                <Heart size={24} color={likedPosts.includes(item.id) ? "#e0245e" : "#65676b"} fill={likedPosts.includes(item.id) ? "#e0245e" : "none"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageCircle size={24} color="#65676b" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Share2 size={24} color="#65676b" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

// ================== SEARCH SCREEN (WITH TO-DO LIST STYLE LOGIC) ==================
function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', text: "Muhammad Bilal" },
    { id: '2', text: "FAST University" },
    { id: '3', text: "Swat Valley Trip" },
    { id: '4', text: "Ali Hassan" }
  ]);

  const handleSearchSubmit = () => {
    if (searchText.trim() === '') return;
    const newSearch = {
      id: `search_${Date.now()}`,
      text: searchText.trim()
    };
    setRecentSearches([newSearch, ...recentSearches]);
    setSearchText('');
  };

  const deleteSearchItem = (id) => {
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.screenTitle}>Search</Text>
      </View>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearchSubmit}>
          <Search size={22} color="#1877F2" style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Facebook"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>

      <ScrollView>
        <Text style={styles.sectionHeader}>Recent Searches</Text>
        {recentSearches.map((item) => (
          <View key={item.id} style={styles.recentItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={styles.recentAvatar}><Text>👤</Text></View>
              <Text style={styles.recentText}>{item.text}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteSearchItem(item.id)} style={{ padding: 8 }}>
              <Trash2 size={18} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ================== PROFILE SCREEN (WITH LOGOUT FUNCTIONALITY) ==================
function ProfileScreen({ onLogout }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverPhoto}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800" }} 
          style={styles.coverImage} 
        />
        <View style={styles.profilePicContainer}>
          <Image 
            source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} 
            style={styles.profileBig} 
          />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Aima Khan</Text>
        <Text style={styles.profileBio}>Student | Explorer | Love traveling & photography</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.menuSection}>
        {[
          { label: "Friends" },
          { label: "Reels" },
          { label: "Photos" },
          { label: "Notifications" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuText}>👥 {item.label}</Text>
          </TouchableOpacity>
        ))}
        
        {/* Logout Trigger button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <LogOut color="white" size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

// ================== APP ROOT CONTAINER WIRED WITH MOCKUP IPHONE FRAME ==================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={Platform.OS === 'web' ? styles.webWrap : { flex: 1 }}>
      <View style={Platform.OS === 'web' ? styles.phoneFrame : { flex: 1 }}>
        {Platform.OS === 'web' && <View style={styles.notch} />}
        
        {!isLoggedIn ? (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1877F2',
                tabBarInactiveTintColor: '#65676b',
                tabBarStyle: { height: 60, paddingBottom: 8 },
              }}
            >
              <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Home color={color} size={26} /> }} />
              <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color }) => <Search color={color} size={26} /> }} />
              <Tab.Screen name="Profile" options={{ tabBarIcon: ({ color }) => <User color={color} size={26} /> }}>
                {(props) => <ProfileScreen {...props} onLogout={() => setIsLoggedIn(false)} />}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        )}
        
      </View>
    </View>
  );
}

// ================== STYLES ==================
const loginStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#1877F2', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#f0f2f5', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  loginBtn: { backgroundColor: '#1877F2', padding: 15, borderRadius: 8, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  forgotText: { color: '#1877F2', textAlign: 'center', marginTop: 20, fontWeight: '500' }
});

const taskStyles = StyleSheet.create({
  taskSection: { backgroundColor: '#fff', padding: 15, marginVertical: 8 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#1877F2' },
  inputRow: { flexDirection: 'row', marginBottom: 10 },
  input: { flex: 1, backgroundColor: '#f0f2f5', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  addBtn: { backgroundColor: '#1877F2', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  removeAll: { marginTop: 10, alignSelf: 'center' },
  removeText: { color: 'red', fontWeight: 'bold' }
});

const styles = StyleSheet.create({
  // Elegant iPhone 17 Pro Max Simulation Frame markup matching provided structural file properties
  webWrap: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', minHeight: '100%' },
  phoneFrame: { width: 430, height: 932, backgroundColor: '#f0f2f5', borderRadius: 55, overflow: 'hidden', borderWidth: 12, borderColor: '#1e293b', position: 'relative' },
  notch: { position: 'absolute', top: 12, width: 115, height: 30, backgroundColor: 'black', alignSelf: 'center', borderRadius: 20, zIndex: 100 },

  container: { flex: 1, backgroundColor: '#f0f2f5' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, paddingTop: Platform.OS === 'web' ? 45 : 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  facebookLogo: { fontSize: 28, fontWeight: '700', color: '#1877F2' },
  topRightIcons: { flexDirection: 'row', gap: 15 },
  iconBtn: { padding: 5 },
  createPost: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  whatsOnMind: { flex: 1, backgroundColor: '#f0f2f5', padding: 12, borderRadius: 30, borderWidth: 1, borderColor: '#ddd' },
  whatsOnMindText: { color: '#65676b', fontSize: 16 },
  storiesContainer: { backgroundColor: 'white', paddingVertical: 10 },
  createStory: { width: 110, height: 170, marginLeft: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  storyCard: { width: 110, height: 170, marginHorizontal: 6, borderRadius: 12, overflow: 'hidden' },
  storyBigImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  plusCircle: { position: 'absolute', bottom: 45, backgroundColor: 'white', borderRadius: 50, padding: 2, borderWidth: 3, borderColor: '#1877F2' },
  storyText: { marginTop: 5, fontSize: 12, fontWeight: '500', color: '#000' },
  postCard: { backgroundColor: 'white', marginVertical: 8, borderRadius: 8, overflow: 'hidden' },
  postHeader: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUser: { fontWeight: '600', fontSize: 15 },
  postTime: { color: '#65676b', fontSize: 13 },
  postContent: { paddingHorizontal: 12, paddingBottom: 10, fontSize: 15, lineHeight: 22 },
  postImage: { width: '100%', height: 350, resizeMode: 'cover' },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  actionBtn: { padding: 8 },
  searchHeader: { padding: 15, paddingTop: Platform.OS === 'web' ? 50 : 15, backgroundColor: 'white' },
  screenTitle: { fontSize: 24, fontWeight: 'bold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', margin: 12, padding: 12, borderRadius: 50, borderWidth: 1, borderColor: '#ddd' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  sectionHeader: { fontSize: 18, fontWeight: '600', padding: 15, color: '#1877F2' },
  recentItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: 'white', marginHorizontal: 12, marginVertical: 4, borderRadius: 8 },
  recentAvatar: { width: 40, height: 40, backgroundColor: '#e4e6ea', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  recentText: { fontSize: 16, fontWeight: '500' },
  coverPhoto: { height: 220, position: 'relative' },
  coverImage: { width: '100%', height: '100%' },
  profilePicContainer: { position: 'absolute', bottom: -40, left: 15, borderWidth: 4, borderColor: 'white', borderRadius: 50 },
  profileBig: { width: 100, height: 100, borderRadius: 50 },
  profileInfo: { alignItems: 'center', marginTop: 45 },
  profileName: { fontSize: 24, fontWeight: 'bold' },
  profileBio: { color: '#65676b', marginTop: 4, textAlign: 'center', paddingHorizontal: 20 },
  editButton: { backgroundColor: '#1877F2', margin: 15, padding: 12, borderRadius: 8, alignItems: 'center' },
  editButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  menuSection: { marginTop: 10, paddingBottom: 30 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white', marginHorizontal: 12, marginVertical: 4, borderRadius: 8 },
  menuText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', backgroundColor: '#ef4444', marginHorizontal: 12, marginVertical: 12, padding: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 8 },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});