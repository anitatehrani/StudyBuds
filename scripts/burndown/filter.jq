# .items|map(select(.status|contains("To do") or contains("In progress")))
.items|[map(select(.status|contains("To do") or contains("In progress")))[].estimate]|add
# [.items[].estimate] | add
