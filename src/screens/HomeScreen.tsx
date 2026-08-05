import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppStore} from '../store/useAppStore';
import type {RootStackParamList} from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const {width} = Dimensions.get('window');

const features = [
  {id: '1', icon: '📊', title: '数据统计', desc: '查看详细数据分析', color: '#6366f1'},
  {id: '2', icon: '📝', title: '任务管理', desc: '高效管理日常任务', color: '#ec4899'},
  {id: '3', icon: '💬', title: '消息中心', desc: '接收重要通知消息', color: '#14b8a6'},
  {id: '4', icon: '📅', title: '日程安排', desc: '规划你的时间', color: '#f59e0b'},
  {id: '5', icon: '🎯', title: '目标追踪', desc: '追踪目标完成进度', color: '#10b981'},
  {id: '6', icon: '🔔', title: '提醒事项', desc: '不错过任何重要事', color: '#ef4444'},
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {counter, incrementCounter, decrementCounter, user, loadSettings} = useAppStore();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>你好，{user?.name || '用户'} 👋</Text>
          <Text style={styles.subtitle}>欢迎使用 Awesome App</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>👨‍💻</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>计数器演示</Text>
        <View style={styles.counterRow}>
          <TouchableOpacity style={styles.counterBtn} onPress={decrementCounter}>
            <Text style={styles.counterBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{counter}</Text>
          <TouchableOpacity style={styles.counterBtn} onPress={incrementCounter}>
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>功能入口</Text>
      <View style={styles.featuresGrid}>
        {features.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.featureCard, {borderColor: item.color + '30'}]}
            onPress={() =>
              navigation.navigate('Detail', {title: item.title, data: item})
            }>
            <View style={[styles.featureIcon, {backgroundColor: item.color + '20'}]}>
              <Text style={styles.featureIconText}>{item.icon}</Text>
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bannerCard}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>GitHub Actions</Text>
          <Text style={styles.bannerDesc}>支持iOS与Android双端云构建</Text>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>立即体验</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerIcon}>
          <Text style={{fontSize: 60}}>🚀</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  statsCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  counterBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b',
    minWidth: 80,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 50) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#94a3b8',
  },
  bannerCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bannerDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 6,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 13,
  },
  bannerIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
