i= 0
while i<11:
    print(i,end=',')
    i+=1
list1 = [12,15,32,42,55,75,122,132,150,180,200]
for i in list1:
    print(i)

input1 = int(input())

i =0
while i <11:
    print(input1*i)
    i+=1
grocery = ['bread','muilk','butter']
for i ,val in enumerate(grocery):
    print(i,val)
fact = int(input())
i =0
sum1=0
while i < fact:
    sum1+=i
    print(sum1)
    i+=1
print('----------------------------')
num = range(3,6)
for k in num:
    print(k)
print('----------------------------')
num = list(range(3,20,2))
print(num)
print('----------------------------')
py ='python'
for i in range(len(py)):
    print(py[i],end='')