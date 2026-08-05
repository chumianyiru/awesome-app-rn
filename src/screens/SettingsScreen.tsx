import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {useAppStore} from '../store/useAppStore';

const SettingsScreen = () => {
  const {theme, notifications, language, setTheme, setNotifications, setLanguage} =
    useAppStore();

  const showAbout = () => {
    Alert.alert(
      '关于 Awesome App',
      '版本: 1.0.0\nReact Native: 0.73.4\n\n一个功能丰富的跨平台移动应用，支持GitHub Actions云端构建。',
      [{text: '确定'}],
    );
  };

  const settingGroups = [
    {
      title: '通用设置',
      items: [
        {
          icon: '🌙',
          title: '深色模式',
          type: 'switch',
          value: theme === 'dark',
          onValueChange: (v: boolean) => setTheme(v ? 'dark' : 'light'),
        },
        {
          icon: '🔔',
          title: '消息通知',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: '🌐',
          title: '语言设置',
          type: 'nav',
          value: language === 'zh' ? '简体中文' : 'English',
          onPress: () => setLanguage(language === 'zh' ? 'en' : 'zh'),
        },
      ],
    },
    {
      title: '缓存与存储',
      items: [
        {icon: '📦', title: '清除缓存', type: 'nav', value: '23.5 MB', onPress: () => Alert.alert('提示', '缓存已清除')},
        {icon: '📱', title: '存储管理', type: 'nav', value: '', onPress: () => {}},
      ],
    },
    {
      title: '关于',
      items: [
        {icon: 'ℹ️', title: '关于应用', type: 'nav', value: 'v1.0.0', onPress: showAbout},
        {icon: '⭐', title: '给个好评', type: 'nav', value: '', onPress: () => {}},
        {icon: '📄', title: '用户协议', type: 'nav', value: '', onPress: () => {}},
        {icon: '🔒', title: '隐私政策', type: 'nav', value: '', onPress: () => {}},
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {settingGroups.map((group, gi) => (
        <View key={group.title}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.card}>
            {group.items.map((item, ii) => (
              <TouchableOpacity
                key={item.title}
                style={[
                  styles.settingItem,
                  ii === group.items.length - 1 && {borderBottomWidth: 0},
                ]}
                onPress={item.type === 'nav' ? item.onPress : undefined}
                activeOpacity={item.type === 'nav' ? 0.6 : 1}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.type === 'switch' ? (
                  <Switch
                    value={item.value as boolean}
                    onValueChange={item.onValueChange}
                    trackColor={{false: '#cbd5e1', true: '#6366f1'}}
                    thumbColor={item.value ? '#fff' : '#f1f5f9'}
                  />
                ) : (
                  <View style={styles.itemRight}>
                    {'value' in item && item.value ? (
                      <Text style={styles.itemValue}>{item.value}</Text>
                    ) : null}
                    <Text style={styles.itemArrow}>›</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.buildInfo}>
        <Text style={styles.buildInfoText}>GitHub Actions 云构建支持</Text>
        <Text style={styles.buildInfoSub}>iOS · Android 双端自动化构建</Text>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  groupTitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 6,
  },
  itemArrow: {
    fontSize: 22,
    color: '#cbd5e1',
    fontWeight: '300',
  },
  buildInfo: {
    alignItems: 'center',
    marginTop: 30,
  },
  buildInfoText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  buildInfoSub: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 4,
  },
});

export default SettingsScreen;
