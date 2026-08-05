import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import type {RootStackParamList} from '../../App';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const {title, data} = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.iconEmoji}>{data?.icon || '📄'}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{data?.desc || '功能详情页面'}</Text>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>功能说明</Text>
        <Text style={styles.cardText}>
          这是 {title} 功能的详情页面。本应用采用 React Native 框架开发，支持 iOS 和 Android 双平台，
          通过 GitHub Actions 实现云端自动化构建。
        </Text>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>技术栈</Text>
        <View style={styles.techList}>
          {['React 18', 'React Native 0.73', 'TypeScript', 'React Navigation', 'Zustand', 'GitHub Actions'].map(
            (tech) => (
              <View key={tech} style={styles.techTag}>
                <Text style={styles.techTagText}>{tech}</Text>
              </View>
            ),
          )}
        </View>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>构建特性</Text>
        <View style={styles.featureList}>
          {[
            '✅ 自动触发构建',
            '✅ Android APK/AAB 输出',
            '✅ iOS IPA 归档',
            '✅ 构建产物自动上传',
            '✅ 多环境配置支持',
            '✅ 完整的构建日志',
          ].map((item) => (
            <Text key={item} style={styles.featureItem}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      <View style={{height: 30}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  iconEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  desc: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  contentCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    backgroundColor: '#6366f115',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  techTagText: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '500',
  },
  featureList: {
    gap: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
});

export default DetailScreen;
