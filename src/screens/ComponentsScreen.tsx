import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';

const ComponentsScreen = () => {
  const [text, setText] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<string | null>(null);

  const buttons = ['按钮一', '按钮二', '按钮三', '按钮四'];
  const tags = ['热门', '推荐', '新品', '限时', '特惠'];

  const handlePress = (name: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('提示', `你点击了: ${name}`);
    }, 800);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>按钮组件</Text>
      <View style={styles.card}>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => handlePress('主要按钮')}>
            <Text style={styles.primaryBtnText}>主要按钮</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => handlePress('轮廓按钮')}>
            <Text style={styles.outlineBtnText}>轮廓按钮</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.dangerBtn} onPress={() => handlePress('危险按钮')}>
          <Text style={styles.dangerBtnText}>危险按钮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loadingBtn, loading && styles.loadingBtnDisabled]}
          onPress={() => handlePress('加载按钮')}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.loadingBtnText}>点击加载</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>输入框组件</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="请输入内容..."
          value={text}
          onChangeText={setText}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="多行输入框..."
          multiline
          numberOfLines={4}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <Text style={styles.sectionTitle}>开关组件</Text>
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>推送通知</Text>
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            trackColor={{false: '#cbd5e1', true: '#6366f1'}}
            thumbColor={switchValue ? '#fff' : '#f1f5f9'}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>标签选择</Text>
      <View style={styles.card}>
        <View style={styles.tagsWrap}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedBtn === tag && styles.tagActive,
              ]}
              onPress={() => setSelectedBtn(selectedBtn === tag ? null : tag)}>
              <Text
                style={[
                  styles.tagText,
                  selectedBtn === tag && styles.tagTextActive,
                ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>进度展示</Text>
      <View style={styles.card}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: '70%'}]} />
          </View>
          <Text style={styles.progressText}>70%</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, styles.progressFillWarn, {width: '45%'}]} />
          </View>
          <Text style={styles.progressText}>45%</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, styles.progressFillDanger, {width: '90%'}]} />
          </View>
          <Text style={styles.progressText}>90%</Text>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginTop: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineBtnText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 14,
  },
  dangerBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingBtnDisabled: {
    opacity: 0.7,
  },
  loadingBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1e293b',
    backgroundColor: '#f8fafc',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 15,
    color: '#334155',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tagActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  tagText: {
    fontSize: 13,
    color: '#64748b',
  },
  tagTextActive: {
    color: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressFillWarn: {
    backgroundColor: '#f59e0b',
  },
  progressFillDanger: {
    backgroundColor: '#ef4444',
  },
  progressText: {
    width: 40,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
});

export default ComponentsScreen;
