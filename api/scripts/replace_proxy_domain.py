import os
import re

TARGET_DIRS = ['.']  # 递归查找当前目录及子目录
OLD_DOMAIN = 'wztz.wokaotianshi.eu.org'
NEW_DOMAIN = 'your.new.proxy.domain.com'  # 修改为你的新代理域名

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old not in content:
        return False
    new_content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True

def scan_and_replace():
    print(f"开始替换代理域名：{OLD_DOMAIN} → {NEW_DOMAIN}")
    count = 0
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith(('.py', '.yml', '.md', '.json', '.txt')):
                path = os.path.join(root, file)
                try:
                    if replace_in_file(path, OLD_DOMAIN, NEW_DOMAIN):
                        print(f"[已替换] {path}")
                        count += 1
                except Exception as e:
                    print(f"[错误] {path}: {e}")
    print(f"替换完成，共修改 {count} 个文件。")

if __name__ == '__main__':
    scan_and_replace()