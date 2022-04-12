import hashlib as hl
import os


directory = 'task2/'


def dec_to_hex(num):
    result = hex(num).removeprefix("0x")
    if len(result) == 1:
        result = "0" + result
    return result


files = os.listdir(directory)
array = [0] * int(len(files))


for i in range(int(len(files))):
    file_name = directory + 'file_' + dec_to_hex(i) + '.data'
    file = open(file_name, 'rb')
    array[i] = hl.sha3_256(file.read()).hexdigest()

sorted_array = sorted(array)
result_file = open('result_file.data', 'w')

for i in range(len(sorted_array)):
    result_file.write(sorted_array[i])

result_file.write('dovgolenokd@gmail.com')
result_file.close()

result_file = open('result_file.data', 'rb')
result_hash = hl.sha3_256(result_file.read()).hexdigest()
print(result_hash)

