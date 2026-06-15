import json
import re
import sys

data = json.load(sys.stdin)
command = data.get("tool_input", {}).get("command", "")

# 차단할 위험한 터미널 명령어 목록
blocked = [
    r"\brm\s+-rf\b",
    r"\bgit\s+reset\s+--hard\b",
]

for pattern in blocked:
    if re.search(pattern, command):
        print(f"Blocked dangerous command: {command}", file=sys.stderr)
        sys.exit(2) # exit code 2로 에이전트의 실행을 원천 차단

sys.exit(0)