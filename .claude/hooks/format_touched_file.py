import json
import subprocess
import sys
from pathlib import Path

data = json.load(sys.stdin)
path = data.get("tool_input", {}).get("file_path")

if not path:
    sys.exit(0)

p = Path(path)

# SCSS, HTML, JS 파일을 수정했을 때만 npx prettier로 자동 포맷팅
if p.suffix in [".scss", ".css", ".html", ".js"]:
    result = subprocess.run(
        ["npx", "prettier", "--write", str(p)],
        text=True,
        capture_output=True,
    )
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        sys.exit(2)

sys.exit(0)