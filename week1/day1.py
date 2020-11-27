list1 = ['john','chan','yuen','matt']
print(list1)
print(list1[1])
list1[1]="sebas"
list2= [list1[0],23,list1[1],14,list1[2],33,list1[3],40]
print(list2)
listnum = [10,20,[300,400,[5000,6000],500],30,40]
#listnum[1,1,1]=7000
listnum[2][2]+=[7000]

print(listnum)
###################
list1 = [5,10,15,20,25,50,20]
list1[list1.index(20)]=200
print(list1)
####
tuple1= ('black','white','brown','greem','yellow')
aTuple = (10,20,30,40)
a1,a2,a3,a4 = aTuple
print(a1,a2,a3,a4)

#####
l1 = [2,312,3,3]
l2 = ['p','2']
n=[]
n.extend(l2,l1)
print(n)