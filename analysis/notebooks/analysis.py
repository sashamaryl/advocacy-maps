from itertools import chain
from dateutil.parser import parse
from datetime import datetime
import pandas as pd
import re

to_namedtuple = lambda x: list(x.itertuples())
actions = to_namedtuple(pd.read_csv('../data/all-history-actions.csv'))
findBillNum = re.compile('([HS]\d{1,5})')


def getHistory(billnum):
  return list(filter(lambda a: a.id == billnum, actions))
  

def getReferencedBills(action_items):
  connects = set()
  for action in action_items:
    id = action.id
    action = action.action
    connid = findBillNum.findall(action)
    connects.update(connid)
  return connects


def collectConnections(billnum):
  queue = [billnum]
  connected = set()
  
  while len(queue) > 0:
    b = queue.pop()
    
    hist = getHistory(b)
    bill_ids = getReferencedBills(hist)
    for id in bill_ids:
      if id not in connected and id != billnum:
        queue.append(id)
        connected.add(id)
    
  return connected


def print_bills(bill_ids):
  for id in bill_ids:
    history = getHistory(id)
    for action in history:
      date = datetime.strftime(parse(action.date), "%x %X")
      print(action.id, action.branch, date, action.action)
    print()

def print_with_stats(bill_ids):
  print("total bills: ", len(bill_ids))
  for id in bill_ids:
    print()
    history = getHistory(id)
    print("bill: ", id)
    print(get_bills_urls([id]))
    print("history actions: ", len(history))
    print("connections: ", collectConnections(id))
    for action in history:
      date = datetime.strftime(parse(action.date), "%x %X")
      print(action.branch, date, action.action)
    print()


def find_bills_with_status(pattern: re.Pattern[str], branch = None):
  bill_ids = set()
  for action in actions:
    has_status = pattern.search(action.action) is not None
    has_branch = branch is None or branch == action.branch
    if has_status and has_branch:
      bill_ids.add(action.id)
  return list(bill_ids)


def find_bills_within(foundActions, pattern: re.Pattern[str], branch = None):
  bill_ids = set()
  for action in foundActions:
    has_status = pattern.search(action.action) is not None
    has_branch = branch is None or branch == action.branch
    if has_status and has_branch:
      bill_ids.add(action.id)
  return list(bill_ids)


def get_bill_tuple(bill_id):
  return [x for x in actions if x == bill_id]


def remove_terms(billid, pattern: re.Pattern[str]):
  hist = getHistory(billid)
  for i in hist: 
    has_status = pattern.search(i.action) is not None
    if has_status: 
      return True
  return False


def print_all_actions(pattern: re.Pattern[str]):
  selected_actions = []
  for action in actions: 
    has_status = pattern.search(action.action) is not None
    if has_status: 
      date = datetime.strftime(parse(action.date), "%x %X")
      selected_actions.append([action.id, action.branch, date, action.action])
  return selected_actions


def write_with_stats_to_file(bill_ids, filename, used_keyword="no keyword"):
  f = open(filename, "w")
  f.write(filename)
  f.write("\nkeyword: {str_keyword}\n".format(str_keyword = used_keyword))
  f.write( "total bills: {bills_len}\n\n".format(bills_len = len(bill_ids)))
  for id in bill_ids:
    history = getHistory(id)
    f.write("bill: {bill}\n".format(bill = id))
    f.write("connections: {total_conns}\n".format(total_conns = collectConnections(id)))
    f.write("history actions: {hist}\n".format(hist = len(history)))
    for action in history:
      date = datetime.strftime(parse(action.date), "%x %X")
      f.write("{branch}\t{date_string}\t{action_item}\n".format(branch = action.branch, date_string = date, action_item = action.action))
    f.write("\n")
  f.close()

def save_to_file(s, path):
  with open(path, 'w') as f:
    f.write(s)
        

def format_bill_url(billnum: str):
  return f'https://mapletestimony.org/bill?id={billnum}'

def get_bills_urls(bills):
  return [format_bill_url(bill) for bill in bills]

def format_date(action):
  return datetime.strftime(parse(action.date), "%x %X")

def date_day(action): 
  date = action if type(action) == str else action.date
  return datetime.strftime(parse(date), "%x")

def date_time(action): 
  date = action if type(action) == str else action.date
  return datetime.strftime(parse(date), "%X")

def print_action(a):
  return (a.bill_id, a.action_id,a.branch, a.action, a.connections, a.date)




class Action: 
  def __init__(self, index, action) -> None:
    self.bill_id: str = action.id
    self.action_id: str = action.id + "." + str(index)
    self.branch: str = action.branch
    self.action: str = action.action
    self.date: str = action.date
    self.connections: list[str] = findBillNum.findall(self.action)

class Bill: 
  def __init__(self, bill):
    self.id: str = bill
    self.title: str | None = None 
    self.url: str = get_bills_urls([bill])
    self.history: list[str] = getHistory(bill)
    self.actions: list[Action] = [Action(index, a) for index, a in enumerate(self.history)]
    self.connections = list(chain([action.connections for action in self.actions]))
